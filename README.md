
Извиняюсь за код, задание было сделано в спешке.


Для запуска нужно иметь nginx.
В его конфиг нужно написать следующее.
```
events {}
http {
server {  
    listen 8080;

    location / {
	    root /home/user/code/map/front;
	    index index.html;
    }
    location /api {
    	proxy_pass http://localhost:5000;
    }

}}
```

Nginx будет отдавать статику, а flask будет предоставлять api.

Далее надо будет запустить nginx, и запустить `main.py`

Затем заходим на `localhost:8080`

Для добавления маркеров надо тыкнуть по карте, для удаления маркера - тыкнуть по маркеру.
