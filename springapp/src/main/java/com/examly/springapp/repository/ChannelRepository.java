package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Bot;
import com.examly.springapp.model.Channel;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long> {

    List<Channel> findByBot(Bot bot);

    List<Channel> findByChannelType(String channelType);

}