package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.dto.request.MessageRequest;
import com.examly.springapp.dto.response.MessageResponse;

public interface MessageService {

    MessageResponse createMessage(MessageRequest request);

    List<MessageResponse> getAllMessages();

    MessageResponse getMessageById(Long id);

    MessageResponse updateMessage(Long id, MessageRequest request);

    void deleteMessage(Long id);

}