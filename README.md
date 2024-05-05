# Healthcare Consultation - Anil Health

This is a full-stack web application with React.js as the frontend and Django as the backend. The application is containerized using Docker and orchestrated with Docker Compose.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Docker
-   Docker Compose

### Installing

1. Clone the repository

```
https://github.com/anslin-raj/healthcare-consultation-app.git
```

2. Navigate to the project directory

```
healthcare-consultation-app
```

3. Build and run the Docker containers

```
docker-compose up --build
```

The application should now be running at `http://localhost:3000` for the frontend and `http://localhost:8000` for the backend.

## File Structure

```
.
├── LICENSE
├── README.md
├── backend
│   ├── api_auth
│   ├── consultation_report
│   ├── history.txt
│   ├── manage.py
│   ├── backend
│   ├── db.sqlite3
│   └── logos
├── frontend
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   └── src
├── docker-compose.yml
├── frontend.Dockerfile
└── backend.Dockerfile
```

## Built With

-   [React.js](https://reactjs.org/) - The web framework used
-   [Django](https://www.djangoproject.com/) - The backend framework used
-   [Docker](https://www.docker.com/) - Used for containerization
-   [Docker Compose](https://docs.docker.com/compose/) - Used for orchestrating the containers

## Versioning

-   React JS Version: 18.3.1
-   Node Version: 20.12.2
-   Python Version: 3.11.3
-   Django Version: 5.0.4

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.
