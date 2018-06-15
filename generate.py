from subprocess import call
import time
while 1:
  time.sleep(5)
  print 'generate html'
  call(["goaccess", "-f", "/var/log/nginx/access.log", "-o", "report.html"])
  
