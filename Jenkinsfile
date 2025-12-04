pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "vault-cicd-playwright"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out code from GitHub"
                git branch: 'main', url: 'https://github.com/vault-aisha/CICD.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building Docker image for Playwright tests"
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "Running Playwright tests inside Docker container"
                // --shm-size=2g for browser stability
                sh 'docker run --rm --shm-size=2g $DOCKER_IMAGE'
            }
        }

        stage('Archive Playwright Report') {
            steps {
                echo "Archiving Playwright test report"
                // Mount report folder and archive artifacts
                sh 'docker run --rm -v $PWD/playwright-report:/app/playwright-report $DOCKER_IMAGE npx playwright show-report'
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo "Cleaning up dangling Docker images"
            sh 'docker system prune -f'
        }
    }
}
