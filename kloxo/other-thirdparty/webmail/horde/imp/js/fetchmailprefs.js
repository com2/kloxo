var fmprefs_loading=false;function accountSubmit(a){if(!fmprefs_loading&&((a!=null)||!$F("account").empty())){fmprefs_loading=true;$("fm_switch").submit()}}function driverSubmit(){if(!fmprefs_loading&&$F("fm_driver")){fmprefs_loading=true;$("fm_driver_form").submit()}};