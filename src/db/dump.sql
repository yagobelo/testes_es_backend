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
    rg_hospede text not null,
    data_checkin text not null,
    data_checkout text not null,
    status_reserva text not null,
    create_at text not null
  );

create table
  reserva_hospedes (
    id serial primary key,
    hospede_id int not null,
    reserva_id int not null,
    foreign key (hospede_id) references hospedes (id),
    foreign key (reserva_id) references reservas (id),
    create_at text not null
  );