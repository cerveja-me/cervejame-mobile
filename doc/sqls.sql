-- Algumas sqls que revelam algumas informações do aplicativo


select count(*) from location
where updatedAt > '2017-02-07 20:45:00'
and zone is not null
order by updatedAt desc ;


