create table
  hospedes (
    id serial primary key,
    nome text not null,
    data_nascimento text not null,
    telefone text not null,
    email text,
    rg text not null,
    pais text not null,
    estado text not null,
    cidade text not null,
    logradouro text not null,
    numero_endereco text,
    bairro text not null,
    complemento_endereco text,
    create_at text not null
  );

create table
  reservas (
    id serial primary key,
    numero_reserva text not null,
    data_checkin text not null,
    data_checkout text not null,
    status text not null,
    create_at text not null
  );

create table
  reserva_hospedes (
    id serial primary key,
    hospedes_id int not null,
    reservas_id int not null,
    foreign key (hospedes_id) references hospedes (id),
    foreign key (reservas_id) references reservas (id),
    create_at text not null
  );