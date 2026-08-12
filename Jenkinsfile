pipeline {
    agent any

    tools {
        nodejs 'node-20'
    }

    stages {
        // STEP 1: Dynamically pull the code from Git into Jenkins workspace
        stage('Checkout Source Code') {
            steps {
                cleanWs() // Optional: Cleans the workspace directory before building
                checkout scm // Instructs Jenkins to pull code from the Git repo tied to this job
            }
        }

        stage('Build Frontend (React)') {
            steps {
                echo 'Building React Frontend application from local directory...'
                bat 'npm install'
                bat 'npm run build'
            }
        }
        
        stage('Deploy with Docker') {
            steps {
                script {                    
                    echo 'Cleaning up existing frontend container...'
                        try { 
                            bat 'docker stop product-service-react || ver > nul'
                        } catch (Exception e) {}
                        try { 
                            bat 'docker rm product-service-react || ver > nul'
                        } catch (Exception e) {}
                        
                            echo 'Building and running the React Frontend container...'
                            bat 'docker build -t frontend-image .'
                            // Mapping port 3000 on your machine to the container's Nginx port 80
                            bat 'docker run -d -p 3000:80 --name product-service-react frontend-image'
                }
            }
        }
        
        // STEP 4: Run Playwright Regression Tests against the active Docker container
        stage('Run Playwright Regression Tests') {
            steps {
                echo 'Installing Playwright browser binaries...'
                bat 'npx playwright install --with-deps'
                
                echo 'Executing Playwright regression suite against http://localhost:3000...'
                // Running tests using the headless browser runner
                bat 'npx playwright test'
            }
            post {
                always {
                    // Zip the report directory before archiving
                    bat 'powershell Compress-Archive -Path playwright-report\\* -DestinationPath playwright-report.zip -Force'
                    archiveArtifacts artifacts: 'playwright-report.zip', allowEmptyArchive: true
                }
            }
        }
    }

    post {
        success {
            echo 'Frontend built, deployed, and verified with Playwright successfully!'
        }
        failure {
            echo 'The pipeline build or regression test encountered an error. Check logs above.'
        }
        always {
            echo 'Pipeline execution completed.'
        }
    }
}