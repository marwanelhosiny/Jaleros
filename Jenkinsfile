pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-repo')
        BACKEND_IMAGE = "marwanelhosiny/jaleros-platform"
        FRONTEND_IMAGE = "marwanelhosiny/jaleros-client"
        SSH_CREDENTIALS_ID = 'ssh-credentials-id'
        SSH_SERVER = "appuser@62.72.12.221"
        DOCKER_COMPOSE_PATH = "./docker-compose.yml"
        DEPLOY_SCRIPT_PATH = "./deploy.sh"
    }

    stages {
        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    echo "Installing Backend dependencies..."
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('client') {
                    echo "Installing Frontend dependencies..."
                    sh 'npm install'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                echo "Building Backend Docker image..."
                dir('server') {
                    script {
                        sh """
                            docker build -t ${BACKEND_IMAGE}:latest .
                        """
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                echo "Building Frontend Docker image..."
                dir('client') {
                    script {
                        sh """
                            docker build -t ${FRONTEND_IMAGE}:latest .
                        """
                    }
                }
            }
        }

        stage('Push Backend Docker Image') {
            steps {
                echo "Pushing Backend Docker image to Docker Hub..."
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh """
                            echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin
                            docker push ${BACKEND_IMAGE}:latest
                            docker logout
                        """
                    }
                }
            }
        }

        stage('Push Frontend Docker Image') {
            steps {
                echo "Pushing Frontend Docker image to Docker Hub..."
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh """
                            echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin
                            docker push ${FRONTEND_IMAGE}:latest
                            docker logout
                        """
                    }
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                echo "Deploying app via SSH..."
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-repo', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sshagent([SSH_CREDENTIALS_ID]) {
                            sh """
                                set -x
                                scp ${DOCKER_COMPOSE_PATH} ${SSH_SERVER}:/home/appuser/myApp/docker-compose.yml
                                echo '#!/bin/bash
                                export DOCKER_USERNAME="${DOCKER_USERNAME}"
                                export DOCKER_PASSWORD="${DOCKER_PASSWORD}"
                                echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin
                                cd /home/appuser/myApp
                                docker-compose pull
                                docker-compose up -d
                                docker logout' > ${DEPLOY_SCRIPT_PATH}
                                chmod +x ${DEPLOY_SCRIPT_PATH}
                                scp ${DEPLOY_SCRIPT_PATH} ${SSH_SERVER}:/home/appuser/myApp/
                                ssh ${SSH_SERVER} 'bash /home/appuser/myApp/deploy.sh'
                            """
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Deployment failed!"
        }
    }
}
