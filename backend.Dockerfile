FROM python:3.11.3-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

ENV DJANGO_SETTINGS_MODULE=project.settings
ENV DJANGO_SECRET_KEY=your_secret_key_here
ENV DJANGO_DEBUG=False

RUN python manage.py collectstatic --no-input

CMD ["python", "manage.py", "migrate", "--no-input"] && \
    ["python", "manage.py", "runserver", "0.0.0.0:8000"]