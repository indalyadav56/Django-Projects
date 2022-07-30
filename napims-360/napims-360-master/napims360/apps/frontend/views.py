import os

from django.views.generic import TemplateView
from django.conf import settings
from django.views import View


class HomeView(TemplateView, View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    def get_template_names(self):
        template_name = 'client/index.html'
        fall_back = 'fall_back.html'

        template_path = os.path.join(settings.REACT_APP_DIR, template_name)

        if os.path.isfile(template_path):
            return [template_name]
        return [fall_back]
