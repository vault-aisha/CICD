pipeline {
    agent any

    environment {
        // Add any environment variables if needed
        NODE_OPTIONS = "--max_old_space_size=4096"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Run tests and generate HTML report
                bat 'npx playwright test --reporter=html'
            }
        }

        stage('Archive HTML Report') {
            steps {
                // Archive the HTML report as artifacts (safe for any Jenkins)
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished!'
        }
        success {
            echo 'All tests passed!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
