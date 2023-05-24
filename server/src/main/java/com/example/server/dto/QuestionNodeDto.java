package com.example.server.dto;

import com.example.server.model.Question;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor

public class QuestionNodeDto extends NodeDto {
    Question question;
}
