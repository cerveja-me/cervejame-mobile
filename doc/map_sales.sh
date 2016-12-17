#!/bin/bash
echo 'venda de ontem e hoje'
mysql --host=cervejame.coxgsmepqodf.sa-east-1.rds.amazonaws.com --user=cervejame --password=cervejame cervejame --execute="select s.id,p.name,s.amount,s.unitvalue,s.value, c.name,l.lat, l.long,s.createdAt from sale s left join location l on l.id = s.location left join costumer c on c.id = s.costumer left join prodreg pr on pr.id = s.prodreg left join product p  on p.id = pr.product where (Date(l.createdAt) >= Date(now())-1) order by s.createdAt;" > /Users/guardezi/GDrive/Cerveja.me/recente_sales.csv

echo 'vendas passadas'
mysql --host=cervejame.coxgsmepqodf.sa-east-1.rds.amazonaws.com --user=cervejame --password=cervejame cervejame --execute="select s.id,p.name,s.amount,s.unitvalue,s.value, c.name,l.lat, l.long,s.createdAt from sale s left join location l on l.id = s.location left join costumer c on c.id = s.costumer left join prodreg pr on pr.id = s.prodreg left join product p  on p.id = pr.product where (Date(l.createdAt) < Date(now())-1) order by s.createdAt;" > /Users/guardezi/GDrive/Cerveja.me/past_sales.csv

echo 'locais sem vendas ontem e hoje'
mysql --host=cervejame.coxgsmepqodf.sa-east-1.rds.amazonaws.com --user=cervejame --password=cervejame cervejame --execute="select * from location l where l.id not in (select sale.location from sale where Date(sale.createdAt) >= Date(now())-1) and (Date(l.createdAt) >= Date(now())-1) order by createdAt;" > /Users/guardezi/GDrive/Cerveja.me/recent_place_no_sale.csv

echo 'locais sem vendas até ontem e hoje'
mysql --host=cervejame.coxgsmepqodf.sa-east-1.rds.amazonaws.com --user=cervejame --password=cervejame cervejame --execute="select * from location l where l.id not in (select sale.location from sale where Date(sale.createdAt) < Date(now())-1) and (Date(l.createdAt) < Date(now())-1) order by createdAt;" > /Users/guardezi/GDrive/Cerveja.me/past_place_no_sale.csv

