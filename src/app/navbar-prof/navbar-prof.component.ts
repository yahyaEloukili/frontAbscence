import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar-prof',
  templateUrl: './navbar-prof.component.html',
  styleUrls: ['./navbar-prof.component.css']
})
export class NavbarProfComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    (function ($) {

      "use strict";

      var fullHeight = function () {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function () {
          $('.js-fullheight').css('height', $(window).height());
        });

      };
      fullHeight();

      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        console.log("eeeeeeeeeee");
      });

    })(jQuery);

  }

}
