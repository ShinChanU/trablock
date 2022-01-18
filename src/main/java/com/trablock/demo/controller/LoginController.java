package com.trablock.demo.controller;

import com.trablock.demo.dto.member.MemberSaveRequestDto;
import com.trablock.demo.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *  종합 Controller, 이름만 LoginController 구현에 따라 분리 예정
 */
@CrossOrigin
@RequiredArgsConstructor
@Controller
public class LoginController {
    private final MemberService memberService;

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/signup")
    public String signup() {
        return "signup";
    }

//    @PostMapping("/signup")
//    public String signup(@RequestBody MemberSaveRequestDto requestDto) {
//        memberService.join(requestDto);
//        return "redirect:/";
//    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest req, HttpServletResponse res) {
        new SecurityContextLogoutHandler().logout(req, res, SecurityContextHolder.getContext().getAuthentication());
        return "redirect:/";
    }
}
