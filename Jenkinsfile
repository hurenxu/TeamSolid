pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install babel-cli -S' 
                sh 'npm install'
            }
        }
        stage('Test') {
             steps {
                sh 'npm test' 
            }
        }
        stage('Deliever') {
             steps {
                sh 'npm start' 
            }
        }
    }
}
