# SSL Documentation

### Get Started
Certbot has an Nginx plugin, which is supported on many platforms, and certificate installation.

`sudo certbot --nginx`

Running this command will get a certificate for you and have Certbot edit your Nginx configuration automatically to serve it. If you're feeling more conservative and would like to make the changes to your Nginx configuration by hand, you can use the certonly subcommand:

`sudo certbot --nginx certonly`

To learn more about how to use Certbot read our documentation.


###Automating renewal
The Certbot packages on your system come with a cron job that will renew your certificates automatically before they expire. Since Let's Encrypt certificates last for 90 days, it's highly advisable to take advantage of this feature. You can test automatic renewal for your certificates by running this command:

`sudo certbot renew --dry-run`
