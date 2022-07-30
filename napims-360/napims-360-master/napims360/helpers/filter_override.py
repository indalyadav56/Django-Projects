import django_filters
from django.db.models.fields.json import JSONField


class FilterSetOverride(django_filters.FilterSet):
    class Meta:
        fields = '__all__'
        filter_overrides = {
            JSONField: {
                'filter_class': django_filters.CharFilter,
                'extra': lambda f: {
                    'lookup_expr': 'icontains',
                },
            },
        }


def get_filter_class(model_object):
    FilterSetOverride.Meta.model = model_object
    return FilterSetOverride
