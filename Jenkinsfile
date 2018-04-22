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
                sh 'npm install' 
            }
        }
        stage('Test') {
             steps {
                sh 'npm test' 
            }
        }
        stage('Documentation') {
             steps {
                sh './node_modules/.bin/esdoc' 
            }
        }
        stage('Deliever') {
             steps {
                sh 'npm start' 
            }
        }
    }
}
