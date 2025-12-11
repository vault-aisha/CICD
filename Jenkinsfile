pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout your GitHub repo
                git branch: 'main', url: 'https://github.com/vault-aisha/CICD.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node modules
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                // Ensure Playwright browsers are installed
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Run tests and generate HTML report
                bat 'npx playwright test --reporter=html'
            }
        }

        stage('Archive Report') {
            steps {
                // Archive HTML report so you can view it in Jenkins
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
                publishHTML(target: [
                    allowMissing: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report'
                ])
            }
        }
    }

    post {
        always {
            echo "Pipeline finished!"
        }
    }
}
