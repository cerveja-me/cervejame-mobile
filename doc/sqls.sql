-- Algumas sqls que revelam algumas informações do aplicativo

-- comando para conectar
-- mysql --host=cervejame.coxgsmepqodf.sa-east-1.rds.amazonaws.com --user=cervejame --password=cervejame cervejame

select count(*) from location
where updatedAt > '2017-02-07 20:45:00'
and zone is not null
order by updatedAt desc ;


-- ponta grossa ios
select concat('"',push_token,'",') from device d where (type is null or type ='ios') and d.id
in (
  select distinct device
  from location
  where zone = '499dfe43-7712-438d-85bf-888b98c7c717');

-- ponta grossa android
select concat('"',push_token,'",') from device d where ( type ='android') and d.id
in (
  select distinct device
  from location
  where zone = '499dfe43-7712-438d-85bf-888b98c7c717');


-- novos usuarios por dia na cidade de ponta grossa
select Date(createdAt - interval 3 hour), count(*) from device d where d.id
in (
  select distinct device
  from location
  where zone = '499dfe43-7712-438d-85bf-888b98c7c717')
group by Date(createdAt - interval 3 hour);

-- novos usuarios por dia na cidade de ponta grossa
select Date(createdAt - interval 3 hour), count(*) from device d where d.id
in (
  select distinct device
  from location
  where zone = '499dfe43-7712-438d-85bf-888b98c7c717')
group by Date(createdAt - interval 3 hour);

-- aberturas do aplicativo por dia na cidade
select Date(createdAt - interval 3 hour), count(*) from location where zone = '499dfe43-7712-438d-85bf-888b98c7c717' group by Date(createdAt - interval 3 hour);

-- usuarios que fizeram pedido
select c.name, c.email,concat('https://www.facebook.com/',c.facebook_id) ,c.createdAt from costumer c where c.id  in (select costumer from sale) and createdat > '2017-01-26 00:00:00';

-- ultimos 5 pedidos e suas respectivas notas
select  z.name as 'local',
c.name as 'cliente',
p.name as 'product',
s.finishedAt as 'finalizado',
s.costumerRate as 'cliente',
s.serviceRate as 'servico',
s.costumerComment as 'comentario'
from sale s
left join costumer c on c.id = s.costumer
left join prodreg pr on pr.id = s.prodreg
left join product p on pr.product = p.id
left join zone z on z.id = pr.zone
order by s.createdAt desc limit 5;


