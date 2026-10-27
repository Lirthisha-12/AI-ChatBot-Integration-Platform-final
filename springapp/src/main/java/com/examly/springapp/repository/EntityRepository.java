package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Bot;
import com.examly.springapp.model.EntityModel;

@Repository
public interface EntityRepository extends JpaRepository<EntityModel, Long> {

    List<EntityModel> findByBot(Bot bot);

    List<EntityModel> findByEntityType(String entityType);

}