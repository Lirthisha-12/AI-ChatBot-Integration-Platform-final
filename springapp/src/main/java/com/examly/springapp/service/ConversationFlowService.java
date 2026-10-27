package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.dto.request.ConversationFlowRequest;
import com.examly.springapp.dto.response.ConversationFlowResponse;

public interface ConversationFlowService {

    ConversationFlowResponse createFlow(ConversationFlowRequest request);

    List<ConversationFlowResponse> getAllFlows();

    ConversationFlowResponse getFlowById(Long id);

    ConversationFlowResponse updateFlow(Long id, ConversationFlowRequest request);

    void deleteFlow(Long id);

}