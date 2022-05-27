FROM public.ecr.aws/nginx/nginx
RUN rm /etc/nginx/conf.d/*
ADD flux/src/hello.conf /etc/nginx/conf.d/
ADD flux/src/index.html /usr/share/nginx/html/
