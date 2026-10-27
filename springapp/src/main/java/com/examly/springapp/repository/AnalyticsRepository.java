package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Analytics;
import com.examly.springapp.model.Bot;

@Repository
public interface AnalyticsRepository extends JpaRepository<Analytics, Long> {

    List<Analytics> findByBot(Bot bot);

    List<Analytics> findByMetricType(String metricType);

}