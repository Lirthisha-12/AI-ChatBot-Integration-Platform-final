package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Bot;
import com.examly.springapp.model.Integration;

@Repository
public interface IntegrationRepository extends JpaRepository<Integration, Long> {

    List<Integration> findByBot(Bot bot);

    List<Integration> findByStatus(String status);

    List<Integration> findByIntegrationType(String integrationType);

}