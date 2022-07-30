from rest_framework import serializers
from .dynamic_fields_mixin import QueryFieldsMixin

from .utils import convert_to_bool


class BaseSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    def recursive_concat_location(self, location, prev):
        if location.parent:
            concat_name = '{}, {}'.format(prev, location.parent.name)
            return self.recursive_concat_location(location.parent, concat_name)
        return prev

    @classmethod
    def unset_mutable(cls, data):
        mutable = None
        if type(data) is not dict:
            mutable = data._mutable
            data._mutable = True

        return data, mutable

    @classmethod
    def set_mutable(cls, data, mutable):
        if type(data) is not dict:
            data._mutable = mutable

        return data

    def set_user_fields(self, data):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
            data, mutable = self.unset_mutable(data)

            if data.get('id', None) is None and user is not None:
                data['created_by'] = user.id
            elif data.get('id', None) is not None and user is not None:
                data['modified_by'] = user.id

            if (
                    data.get('created_by', None) is not None and type(data.get('created_by', None)) is dict
            ):
                data['created_by'] = data['created_by']['id']

            if (
                    data.get('modified_by', None) is not None and type(data.get('modified_by', None)) is dict
            ):
                data['modified_by'] = data['modified_by']['id']

            print(data)
            data = self.set_mutable(data, mutable)

        return data

    def to_internal_value(self, data):
        data = self.set_user_fields(data)
        return super(BaseSerializer, self).to_internal_value(data)

    @classmethod
    def get_user_object(cls, instance, serialized, field):
        if serialized.get(field, None) is not None:
            serialized[field] = dict(
                username=getattr(instance, field).username,
                email=getattr(instance, field).email,
                id=getattr(instance, field).id,
            )

        return serialized

    def ignore_nesting(self):
        request = self.context.get('request', None)
        should_nest = True
        is_not_get_method = request is not None and request.method != 'GET'

        if request is not None and request.query_params:
            should_nest = request.query_params.get('nesting', True)
        return convert_to_bool(should_nest) is False or is_not_get_method

    def build_tree_recursive(self, children, children_json, serializer_class):
        for idx, child in enumerate(children):
            sub_child = child.get_children()
            sub_children_json = serializer_class(sub_child, many=True).data
            children_json[idx]['children'] = sub_children_json
            self.build_tree_recursive(sub_child, sub_children_json, serializer_class)

    def build_tree(self, response, instance, serializer_class):
        request = self.context.get('request')
        tree_level = None

        if request:
            tree_level = request.query_params.get('tree-level', 'none')

        if tree_level == 'descendants' and hasattr(instance, 'get_descendants'):
            children = instance.get_children()
            children_json = serializer_class(children, many=True).data
            self.build_tree_recursive(children, children_json, serializer_class)
            response['children'] = children_json

        if tree_level == 'children' and hasattr(instance, 'get_children'):
            response['children'] = serializer_class(instance.get_children(), many=True).data

        return response

    def to_representation(self, instance):
        response = super(BaseSerializer, self).to_representation(instance)
        if self.ignore_nesting():
            return response

        response = self.get_user_object(instance, response, 'created_by')
        response = self.get_user_object(instance, response, 'modified_by')
        return response

    def field_subsets(self):
        request = self.context.get('request', None)
        fields = []
        if request is not None and request.query_params:
            fields = request.query_params.get('fields', [])

        return fields

    def in_subset_fields(self, field, fields=None):
        if fields is None:
            fields = self.field_subsets()

        return (len(fields) > 0 and field in fields) or len(fields) == 0

    def set_nested_value(self, response_object, serializer_class, field, instance):
        fields = self.field_subsets()
        if self.in_subset_fields(field, fields):
            response_object[field] = serializer_class(getattr(instance, field)).data
