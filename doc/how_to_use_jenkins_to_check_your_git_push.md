# How to Use Jenkins to Check your Git Push
**If you have any inqueries, you can contact me directly. (Renxu)**
### Assuming that you have already logged into the the google cloud platform
* You are currently at xxx_user_edu directory.
* Type `cd /home/reh011_ucsd_edu`.
* Type `sudo java -jar jenkins.war --httpPort=9090 --prefix=/jenkins &` to run at background or `sudo java -jar jenkins.war --h
ttpPort=9090 --prefix=/jenkins` without run at background.
* Open a web browser, and either click this link **[jenkins][1]** or enter **`http://35.199.159.167/jenkins`** into your browser.
* After your enter the jenkins GUI, we currently have two pipelines, and what we need is the second one called **`test-pipeline`**.
* Click the **`test-pipeline`**.
### If you want to build directly without github push
* There is a `Build Now` button on the left panel, and then you click `Build Now` button. It will start building the pipeline.

### If you want to see the build status
* There is a `Build History` Panel down at the left panel. 
* The build process is started with a `#` symbol. Click the build process that you want to see.
* Inside the build process, it has `Open Blue Ocean` on the left panel. Click `Open Blue Ocean`.
* You will see the build process visually through `Blue Ocean`.

[1]: http://35.199.159.167/jenkins "jenkins"