# Use the official Jenkins image from the Docker Hub
FROM jenkins/jenkins:latest

# Skip the Jenkins setup wizard
ENV JAVA_OPTS -Djenkins.install.runSetupWizard=false

# Automatically install plugins using plugins.txt
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt

# Set up Jenkins configuration as code (JCasC)
COPY jcasc.yaml /var/jenkins_home/casc_configs/jcasc.yaml
