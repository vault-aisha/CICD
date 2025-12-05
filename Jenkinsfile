pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "playwright-tests"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/vault-aisha/CICD.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'docker run --rm --shm-size=2g $DOCKER_IMAGE'
            }
        }
    }

    post {
        always {
            echo "Pipeline finished!"
        }
    }
}
