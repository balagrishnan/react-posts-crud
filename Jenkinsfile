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
                            bat 'docker run -d -p 3000: 80 --name product-service-react frontend-image'
                }
            }
        }
    }

    post {
        success {
            echo 'Frontend built and deployed successfully!'
        }
        failure {
            echo 'The pipeline build encountered an error. Check logs above.'
        }
    }
}