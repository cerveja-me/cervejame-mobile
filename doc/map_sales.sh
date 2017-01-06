#!/bin/bash
echo 'venda de ontem e hoje'
mysql --host=cervejame.coxgsmepqodf.sa-east-1.rds.amazonaws.com --user=cervejame --password=cervejame cervejame --execute="select s.id,p.name as product,s.amount,s.unitvalue,s.value, c.name as cliente,l.lat, l.long,s.createdAt from sale s left join location l on l.id = s.location left join costumer c on c.id = s.costumer left join prodreg pr on pr.id = s.prodreg left join product p  on p.id = pr.product where (Date(l.createdAt) >= Date(now())-1) order by s.createdAt;" | tr "\\t" ","  > /Users/guardezi/GDrive/Cerveja.me/recente_sales.csv

echo 'vendas passadas'
mysql --host=cervejame.coxgsmepqodf.sa-east-1.rds.amazonaws.com --user=cervejame --password=cervejame cervejame --execute="select s.id,p.name as product,s.amount,s.unitvalue,s.value, c.name as cliente,l.lat, l.long,s.createdAt from sale s left join location l on l.id = s.location left join costumer c on c.id = s.costumer left join prodreg pr on pr.id = s.prodreg left join product p  on p.id = pr.product where (Date(l.createdAt) < Date(now())-1) order by s.createdAt;" | tr "\\t" ","  > /Users/guardezi/GDrive/Cerveja.me/past_sales.csv

echo 'locais sem vendas hoje'
mysql --host=cervejame.coxgsmepqodf.sa-east-1.rds.amazonaws.com --user=cervejame --password=cervejame cervejame --execute="select * from location l where l.id not in (select sale.location from sale where Date(sale.createdAt -  interval 3 hour) = Date(now()-  interval 3 hour) ) and Date(createdAt - interval 3 hour) = Date(now()-interval 3 hour) order by createdAt;" | tr "\\t" ","  > /Users/guardezi/GDrive/Cerveja.me/today_place_no_sale.csv

echo 'locais sem vendas ontem e hoje'
mysql --host=cervejame.coxgsmepqodf.sa-east-1.rds.amazonaws.com --user=cervejame --password=cervejame cervejame --execute="select * from location l where l.id not in (select sale.location from sale where Date(sale.createdAt) >= Date(now())-1) and (Date(l.createdAt) >= Date(now())-1) order by createdAt;" | tr "\\t" "," > /Users/guardezi/GDrive/Cerveja.me/yesterday_place_no_sale.csv

echo 'locais sem vendas até ontem e hoje'
mysql --host=cervejame.coxgsmepqodf.sa-east-1.rds.amazonaws.com --user=cervejame --password=cervejame cervejame --execute="select * from location l where l.id not in (select sale.location from sale where Date(sale.createdAt) < Date(now())-1) and (Date(l.createdAt) < Date(now())-1) order by createdAt;" | tr "\\t" "," > /Users/guardezi/GDrive/Cerveja.me/past_place_no_sale.csv

echo 'locais sem vendas todos'
mysql --host=cervejame.coxgsmepqodf.sa-east-1.rds.amazonaws.com --user=cervejame --password=cervejame cervejame --execute="select * from location l where l.id not in (select sale.location from sale) and createdAt > '2016-12-28 00:00:00'  order by createdAt;" | tr "\\t" "," > /Users/guardezi/GDrive/Cerveja.me/no_sale.csv


echo 'vendas por dia',
mysql --host=cervejame.coxgsmepqodf.sa-east-1.rds.amazonaws.com --user=cervejame --password=cervejame cervejame --execute="select sum(amount) as caixas,count(*) as entregas,(sum(amount)/count(*)) as media, date((createdAt-interval 4 hour)) from sale where costumer <>'8fc4966e-e7e2-4048-9741-114e50df7f59' and costumer<>'27e69e14-4529-42ca-b902-aaa830da101d' and costumer <> '32eedda0-1704-4540-94e5-9f1ebf4c3b84' group by date((createdAt-interval 4 hour));" | tr "\\t" "," > /Users/guardezi/GDrive/Cerveja.me/sales.csv

echo 'Aberturas Ultimos 10 dias'
mysql --host=cervejame.coxgsmepqodf.sa-east-1.rds.amazonaws.com --user=cervejame --password=cervejame cervejame --execute="select * from location l where l.id not in (select sale.location from sale) and Date(createdAt - interval 3 hour) > Date(now()-interval 10 day) order by createdAt desc;" | tr "\\t" ","  > /Users/guardezi/GDrive/Cerveja.me/last10_place_no_sale.csv


