package com.trablock.demo.controller;

import com.trablock.demo.dto.member.MemberSaveRequestDto;
import com.trablock.demo.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping(value ="/api")
public class ResourceController {
    private final RequestMappingHandlerMapping handlerMapping;
    private final MemberService memberService;

    @GetMapping("/requests")
    public String show() {
        Map<RequestMappingInfo, HandlerMethod> handlerMethods = handlerMapping.getHandlerMethods();
        return handlerMethods.entrySet()
                .stream()
                .map(String::valueOf)
                .sorted()
                .collect(Collectors.joining("<br />"));
    }

    @PostMapping("/signup")
    public String signup(@RequestBody MemberSaveRequestDto requestDto) {
        memberService.join(requestDto);
        return "redirect:/";
    }

//    @GetMapping("/logout")
//    public String logout(HttpServletRequest req, HttpServletResponse res) {
//        new SecurityContextLogoutHandler().logout(req, res, SecurityContextHolder.getContext().getAuthentication());
//        return "redirect:/";
//    }
}
