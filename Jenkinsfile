pipeline {
    agent any

    environment {
        registry = 'amits64'
        registryCredential = 'dockerhub'
        tag = "v${BUILD_NUMBER}"
    }

    stages {
        stage('Git Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: 'main']],
                    userRemoteConfigs: [[url: 'https://github.com/Amits64/smtp-mailer.git']]
                ])
            }
        }

        stage('Static Code Analysis') {
            steps {
                script {
                    // Execute SonarQube scanner
                    def sonarScannerImage = 'sonarsource/sonar-scanner-cli:latest'
                    docker.image(sonarScannerImage).inside() {
                        withSonarQubeEnv('SonarQube') {
                            sh """
                            sonar-scanner \
                            -Dsonar.host.url=http://192.168.10.11:9000/ \
                            -Dsonar.projectKey=smtp-mailer
                            """
                        }
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image
                    docker.build("${registry}/smtp-mailer:${tag}", "-f Dockerfile .")
                }
            }
        }

        stage('Upload Image') {
            steps {
                script {
                    // Push the Docker image to the registry
                    docker.withRegistry('', registryCredential) {
                        docker.image("${registry}/smtp-mailer:${tag}").push()
                    }
                }
            }
        }

        stage('Remove Unused Docker Image') {
            steps {
                script {
                    sh "docker rmi ${registry}/smtp-mailer:${tag}"
                }
            }
        }

        stage('Deploying Container to Kubernetes') {
            steps {
                dir('smtp-mailer') {
                    script {
                        // Check if the release "calci" exists
                        def releaseExists = sh(returnStatus: true, script: 'helm ls | grep -q "smtp-mailer"') == 0
                        if (releaseExists) {
                            // Delete the release
                            sh 'helm delete smtp-mailer'
                        }

                        // Install Helm chart
                        sh "helm install smtp-mailer ./ --set appimage=amits64/smtp-mailer:${tag} --set-file ca.crt=/etc/ca-certificates/update.d/jks-keystore"
                    }
                }
            }
        }
    }
}
