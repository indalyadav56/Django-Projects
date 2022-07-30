################################################################################
## using node image to install node dependencies
################################################################################

FROM node:lts-slim AS frontend_node


################################################################################
## setup container
################################################################################

WORKDIR /code/

################################################################################
## React app
################################################################################
RUN apt-get update -qq

COPY package.json /code/
COPY services /code/services

RUN yarn config set "strict-ssl" false -g
RUN yarn install
RUN mkdir -p napims360/apps/frontend/templates/client && yarn build



################################################################################
## using python image to install django app
################################################################################

FROM python:3.9-buster AS backend_py

################################################################################
## setup container
################################################################################

COPY conf/* /tmp/
RUN chmod +x /tmp/*.sh
RUN /tmp/docker-setup.sh
RUN /tmp/pg-install.sh
RUN /tmp/after-install.sh

WORKDIR /code/

################################################################################
## Django app
################################################################################

COPY conf/requirements-common.txt /tmp/
COPY conf/requirements-prod.txt /tmp/
RUN pip install -q --upgrade pip && \
    pip install -q -f /tmp/ -r /tmp/requirements-prod.txt

################################################################################
## last setup steps
################################################################################

COPY ./ /code/

# change ownership to app user (avoid root user)
RUN chown -R napims360: /code
RUN rm -rf /code/napims360/apps/frontend/templates/client

RUN rm -rf /code/services
# copy at the end to avoid change ownership delays...
COPY --from=frontend_node /code/napims360/apps/frontend/templates/client /code/napims360/apps/frontend/templates/client

RUN mkdir -p /etc/supervisor/conf.d && mkdir -p /var/log/supervisor && mkdir -p /var/log/napims360_app
RUN ln -sf /code/conf/supervisord.napims360.conf /etc/supervisor/conf.d/napims360.conf
RUN ln -sf /code/conf/supervisord.conf /etc/supervisor/supervisord.conf

RUN chmod +x /code/conf/entrypoint.sh

ENTRYPOINT ["/code/conf/entrypoint.sh"]
CMD ["start"]
