import graphene
from graphene_django.types import ErrorType
from graphene_django_extras.utils import get_Object_or_None
from graphene_django_extras import DjangoSerializerMutation


class SerializerMutation(DjangoSerializerMutation):
    class Meta:
        abstract = True

    @classmethod
    def __init_subclass_with_meta__(cls, *args, **kwargs):
        """
        Override this method from parent class to add ID argument to update mutation
        """
        super(SerializerMutation, cls).__init_subclass_with_meta__(*args, **kwargs)
        if cls._meta.arguments and 'update' in cls._meta.arguments:
            cls._meta.arguments['update'].update(
                {
                    "id": graphene.Argument(
                        graphene.ID,
                        required=True,
                        description="Django object unique identification field",
                    )
                }
            )

    @classmethod
    def update(cls, root, info, **kwargs):
        """
        Get object ID from the top level, instead of from the input argument.
        """
        pk = kwargs.get('id')  # that's the override

        data = kwargs.get(cls._meta.input_field_name)
        request_type = info.context.META.get("CONTENT_TYPE", "")
        if "multipart/form-data" in request_type:
            data.update({name: value for name, value in info.context.FILES.items()})

        old_obj = get_Object_or_None(cls._meta.model, pk=pk)
        if old_obj:
            nested_objs = cls.manage_nested_fields(data, root, info)
            serializer = cls._meta.serializer_class(
                old_obj,
                data=data,
                partial=True,
                **cls.get_serializer_kwargs(root, info, **kwargs),
            )

            ok, obj = cls.save(serializer, root, info)
            if not ok:
                return cls.get_errors(obj)
            elif nested_objs:
                [getattr(obj, field).add(*objs) for field, objs in nested_objs.items()]
            return cls.perform_mutate(obj, info)
        else:
            return cls.get_errors(
                [
                    ErrorType(
                        field="id",
                        messages=[
                            "A {} obj with id: {} do not exist".format(
                                cls._meta.model.__name__, pk
                            )
                        ],
                    )
                ]
            )
