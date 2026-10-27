package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.dto.request.ChannelRequest;
import com.examly.springapp.dto.response.ChannelResponse;

public interface ChannelService {

    ChannelResponse createChannel(ChannelRequest request);

    List<ChannelResponse> getAllChannels();

    ChannelResponse getChannelById(Long id);

    ChannelResponse updateChannel(Long id, ChannelRequest request);

    void deleteChannel(Long id);

}