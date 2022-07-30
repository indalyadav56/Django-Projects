from django.db.models import Q
from django_auto_prefetching import AutoPrefetchViewSetMixin
from rest_framework import viewsets, filters
from url_filter.integrations.drf import DjangoFilterBackend

from .pagination import StandardResultsSetPagination
from .utils import convert_to_bool


class BaseView(AutoPrefetchViewSetMixin, viewsets.ModelViewSet):
    filterset_fields = '__all__'
    filter_fields = '__all__'
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = '__all__'

    def set_query_for_tree_view(self, queryset):
        request = self.request
        query_params = request.query_params
        tree_level = query_params.get('tree-level', None)

        if tree_level and tree_level == 'descendants':
            queryset = queryset.filter(parent__isnull=True)
        return queryset

    def get_queryset(self):
        queryset = self.set_query_for_tree_view(self.queryset)

        data = self.request.query_params
        or_query = data.get('or_query', None)
        if not or_query:
            return queryset

        or_queries = or_query.split(',')
        or_filters = Q()
        for value in or_queries:

            key_value = value.split('=')
            query = dict()
            query[key_value[0]] = convert_to_bool(key_value[1])
            or_filters |= Q(**query)

        return queryset.filter(or_filters)
