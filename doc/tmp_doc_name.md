# server structure
We use express (powered by nodejs) as our main web server in our project. It will handle most of http request. However, a express web server can't satisfy the requiremnt about security and stable. We use nginx as Reverse Proxy Server to redirect http request from outside to "local" express web server. 


> nginx configuration file (/etc/nginx/sites-available/default)
```
...
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```