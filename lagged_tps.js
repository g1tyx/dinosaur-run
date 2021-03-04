"remove" in Element.prototype || (Element.prototype.remove = function () {
    this.parentNode && this.parentNode.removeChild(this)
});
var CSSlink = document.createElement("link");
CSSlink.href = "game2.css", CSSlink.rel = "stylesheet", CSSlink.media = "screen", document.getElementsByTagName("head")[0].appendChild(CSSlink);
var hsData, adsManager, adsLoader, adDisplayContainer, intervalTimer, playButton, videoContent, isMobile, LaggedAPI = {},
    prerollStart = !0,
    adsplaying = !0;
! function () {
    function e(e) {
        t(e)
    }

    function a(e) {
        var t = e.getAd();
        switch (e.type) {
            case google.ima.AdEvent.Type.LOADED:
                t.isLinear() ? setTimeout(function () {
                    adsplaying && n()
                }, 21e3) : setTimeout(function () {
                    adsplaying && n()
                }, 4e3);
                break;
            case google.ima.AdEvent.Type.STARTED:
                document.getElementById("preloader") && document.getElementById("preloader").remove(), t.isLinear() && (intervalTimer = setInterval(function () {
                    adsManager.getRemainingTime()
                }, 300));
                break;
            case google.ima.AdEvent.Type.COMPLETE:
                (document.mozFullScreen || document.webkitFullScreen) && (document.mozCancelFullScreen ? videoContent.mozCancelFullScreen() : videoContent.webkitCancelFullScreen()), t.isLinear() && clearInterval(intervalTimer), n()
        }
    }

    function n() {
        if (adsplaying = !1, document.getElementById("preloader") && document.getElementById("preloader").remove(), adsManager) adsManager.destroy(), document.getElementById("mainContainer").remove(), e({
            success: !0
        });
        else {
            try {
                document.getElementById("playButton") && document.getElementById("playButton").remove(), document.getElementById("mainContainer") && document.getElementById("mainContainer").remove()
            } catch (e) {
                console.log(e)
            }
            e(!1)
        }
    }

    function B(n, r) {
        j.getElementById("createloginBtnMain").disabled = !0;
        var d = j.getElementById("createloginBtnMain").innerText;
        j.getElementById("createloginBtnMain").innerText = "Loading...", j.getElementById("createloginBtnMain").className += " btnloading", j.getElementById("errorsubmit") && j.getElementById("errorsubmit").remove();
        var e, t, a, o, i, l, s = "",
            c = !1,
            m = [];
        return "login" != n && (j.getElementById("inputEmail1") && (s = j.getElementById("inputEmail1").value), (s.length < 2 || 30 < s.length) && (c = !0, m.push("Nickname must be between 2-30 characters"))), (e = j.getElementById("inputEmail2").value).length < 5 && (c = !0, m.push("Please enter a valid email address")), ((t = j.getElementById("inputEmail3").value).length < 6 || 30 < t.length) && (c = !0, m.push("Password must be between 6-30 characters")), c ? (j.getElementById("createloginBtnMain").innerText = d, j.getElementById("createloginBtnMain").classList.remove("btnloading"), j.getElementById("createloginBtnMain").disabled = !1, (a = document.createElement("div")).id = "errorsubmit", a.className = "error_msg", o = document.createTextNode(m[0]), a.appendChild(o), j.getElementById("signupFormWrap").insertBefore(a, j.getElementById("loginit"))) : ((i = new XMLHttpRequest).onreadystatechange = function () {
            var e, t, a;
            4 == this.readyState && 200 == this.status && (a = (a = this.responseText).replace(")]}',", ""), !0 === (a = JSON.parse(a)).success && 0 < a.uid ? (j.getElementById("createloginBtnMain").innerText = "Success!", j.getElementById("createloginBtnMain").className += " btnSuccessMsg", window.parent.showUserInfo(a), setTimeout(function () {
                j.getElementById("createloginBtnMain").className = "main_hs_btn viewranks btnSuccessMsg", p(j.getElementById("leaderboard-modal")), setTimeout(function () {
                    j.getElementById("leaderboard-wrapper").remove()
                }, 200), setTimeout(function () {
                    j.getElementById("leaderboard-modal").remove(), r && LaggedAPI.Scores.load(u, n)
                }, 300)
            }, 600)) : (j.getElementById("createloginBtnMain").innerText = d, j.getElementById("createloginBtnMain").className = "main_hs_btn viewranks", j.getElementById("createloginBtnMain").disabled = !1, (e = document.createElement("div")).id = "errorsubmit", e.className = "error_msg", t = document.createTextNode(a.errors), e.appendChild(t), j.getElementById("signupFormWrap").insertBefore(e, j.getElementById("loginit"))))
        }, (l = {
            fnickname: null
        }).ftype = n, s && (l.fnickname = encodeURIComponent(s)), l.femail = encodeURIComponent(e), l.fpass = encodeURIComponent(t), i.open("POST", "//lagged.com/api/v3/ajax.php", !0), i.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), i.send("ftype=" + l.ftype + "&fnickname=" + l.fnickname + "&femail=" + l.femail + "&fpass=" + l.fpass)), !1
    }

    function p(e) {
        var t = 1;
        a = setInterval(function () {
            if (t <= .1) {
                clearInterval(a);
                try {
                    e.style.display = "none"
                } catch (e) {
                    console.log(e)
                }
            }
            try {
                e.style.opacity = t, e.style.filter = "alpha(opacity=" + 100 * t + ")"
            } catch (e) {
                console.log(e)
            }
            t -= .1 * t
        }, 13)
    }

    function U(e) {
        return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    }

    function P(e) {
        return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function O(e) {
        if (999 < e) return P(e);
        if (99 < e) return e;
        var t = e % 10,
            a = e % 100;
        return 1 == t && 11 != a ? e + "st" : 2 == t && 12 != a ? e + "nd" : 3 == t && 13 != a ? e + "rd" : e + "th"
    }

    function T() {
        p(j.getElementById("leaderboard-loading")), setTimeout(function () {
            j.getElementById("leaderboard-loading").remove()
        }, 200)
    }

    function I(e) {
        var t;
        m = window.parent.isFullscreen, j = m ? document : window.parent.document, e || ((t = document.createElement("div")).id = "leaderboard-modal", t.onclick = function (e) {
            return e.preventDefault(), e.stopPropagation(), !1
        }, j.body.appendChild(t));
        var a = document.createElement("div");
        a.id = "leaderboard-loading", a.className = "leaderboard-circle";
        var n = Math.max(document.documentElement.clientHeight, window.parent.innerHeight || 0),
            r = window.parent.innerWidth;
        r < 769 && 599 < r && 719 < n && a.setAttribute("style", "top:calc(" + n + "px/2 - 249px)"), j.body.appendChild(a)
    }

    function o(e, t, a, n, r, d) {
        var o = new XMLHttpRequest;
        o.onreadystatechange = function () {
            var e;
            4 == this.readyState && 200 == this.status ? (e = (e = this.responseText).replace(")]}',", ""), e = JSON.parse(e), r(e, d)) : 4 == this.readyState && r(e = {
                success: !1
            }, d)
        };
        var i = "//lagged.com/api/v3/ajax_" + t + ".php";
        o.open("POST", i, !0), o.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), o.send("type=" + e + "&action=" + a + "&data=" + n)
    }
    var l, u, j, s = new function () {
            function i(e, t) {
                return (e >>> 1 | t >>> 1) << 1 | 1 & e | 1 & t
            }

            function l(e, t) {
                return (e >>> 1 ^ t >>> 1) << 1 | 1 & e ^ 1 & t
            }

            function s(e, t) {
                return (e >>> 1 & t >>> 1) << 1 | 1 & e & t
            }

            function m(e, t) {
                var a = (65535 & e) + (65535 & t);
                return (e >> 16) + (t >> 16) + (a >> 16) << 16 | 65535 & a
            }

            function p(e) {
                for (var t = "", a = 0; a <= 3; a++) t += n.charAt(e >> 8 * a + 4 & 15) + n.charAt(e >> 8 * a & 15);
                return t
            }

            function c(e, t, a, n, r, d) {
                return m((o = m(m(t, e), m(n, d))) << r | o >>> 32 - r, a);
                var o
            }

            function u(e, t, a, n, r, d, o) {
                return c(i(s(t, a), s(~t, n)), e, t, r, d, o)
            }

            function h(e, t, a, n, r, d, o) {
                return c(i(s(t, n), s(a, ~n)), e, t, r, d, o)
            }

            function g(e, t, a, n, r, d, o) {
                return c(l(l(t, a), n), e, t, r, d, o)
            }

            function v(e, t, a, n, r, d, o) {
                return c(l(a, i(t, ~n)), e, t, r, d, o)
            }
            var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                n = "0123456789abcdef";
            return {
                base64: function (e) {
                    var t, a, n, r, d, o, i, l = "",
                        s = 0;
                    for (e = function (e) {
                            if (!e) return "";
                            e = e.replace(/\r\n/g, "\n");
                            for (var t = "", a = 0; a < e.length; a++) {
                                var n = e.charCodeAt(a);
                                n < 128 ? t += String.fromCharCode(n) : (127 < n && n < 2048 ? t += String.fromCharCode(n >> 6 | 192) : (t += String.fromCharCode(n >> 12 | 224), t += String.fromCharCode(n >> 6 & 63 | 128)), t += String.fromCharCode(63 & n | 128))
                            }
                            return t
                        }(e); s < e.length;) r = (t = e.charCodeAt(s++)) >> 2, d = (3 & t) << 4 | (a = e.charCodeAt(s++)) >> 4, o = (15 & a) << 2 | (n = e.charCodeAt(s++)) >> 6, i = 63 & n, isNaN(a) ? o = i = 64 : isNaN(n) && (i = 64), l = l + b.charAt(r) + b.charAt(d) + b.charAt(o) + b.charAt(i);
                    return l
                },
                md5: function (e) {
                    for (var t = function (e) {
                            for (var t = 1 + (e.length + 8 >> 6), a = new Array(16 * t), n = 0; n < 16 * t; n++) a[n] = 0;
                            for (n = 0; n < e.length; n++) a[n >> 2] |= e.charCodeAt(n) << (8 * e.length + n) % 4 * 8;
                            a[n >> 2] |= 128 << (8 * e.length + n) % 4 * 8;
                            var r = 8 * e.length;
                            return a[16 * t - 2] = 255 & r, a[16 * t - 2] |= (r >>> 8 & 255) << 8, a[16 * t - 2] |= (r >>> 16 & 255) << 16, a[16 * t - 2] |= (r >>> 24 & 255) << 24, a
                        }(e), a = 1732584193, n = -271733879, r = -1732584194, d = 271733878, o = 0; o < t.length; o += 16) {
                        var i = a,
                            l = n,
                            s = r,
                            c = d,
                            n = v(n = v(n = v(n = v(n = g(n = g(n = g(n = g(n = h(n = h(n = h(n = h(n = u(n = u(n = u(n = u(n, r = u(r, d = u(d, a = u(a, n, r, d, t[o + 0], 7, -680876936), n, r, t[o + 1], 12, -389564586), a, n, t[o + 2], 17, 606105819), d, a, t[o + 3], 22, -1044525330), r = u(r, d = u(d, a = u(a, n, r, d, t[o + 4], 7, -176418897), n, r, t[o + 5], 12, 1200080426), a, n, t[o + 6], 17, -1473231341), d, a, t[o + 7], 22, -45705983), r = u(r, d = u(d, a = u(a, n, r, d, t[o + 8], 7, 1770035416), n, r, t[o + 9], 12, -1958414417), a, n, t[o + 10], 17, -42063), d, a, t[o + 11], 22, -1990404162), r = u(r, d = u(d, a = u(a, n, r, d, t[o + 12], 7, 1804603682), n, r, t[o + 13], 12, -40341101), a, n, t[o + 14], 17, -1502002290), d, a, t[o + 15], 22, 1236535329), r = h(r, d = h(d, a = h(a, n, r, d, t[o + 1], 5, -165796510), n, r, t[o + 6], 9, -1069501632), a, n, t[o + 11], 14, 643717713), d, a, t[o + 0], 20, -373897302), r = h(r, d = h(d, a = h(a, n, r, d, t[o + 5], 5, -701558691), n, r, t[o + 10], 9, 38016083), a, n, t[o + 15], 14, -660478335), d, a, t[o + 4], 20, -405537848), r = h(r, d = h(d, a = h(a, n, r, d, t[o + 9], 5, 568446438), n, r, t[o + 14], 9, -1019803690), a, n, t[o + 3], 14, -187363961), d, a, t[o + 8], 20, 1163531501), r = h(r, d = h(d, a = h(a, n, r, d, t[o + 13], 5, -1444681467), n, r, t[o + 2], 9, -51403784), a, n, t[o + 7], 14, 1735328473), d, a, t[o + 12], 20, -1926607734), r = g(r, d = g(d, a = g(a, n, r, d, t[o + 5], 4, -378558), n, r, t[o + 8], 11, -2022574463), a, n, t[o + 11], 16, 1839030562), d, a, t[o + 14], 23, -35309556), r = g(r, d = g(d, a = g(a, n, r, d, t[o + 1], 4, -1530992060), n, r, t[o + 4], 11, 1272893353), a, n, t[o + 7], 16, -155497632), d, a, t[o + 10], 23, -1094730640), r = g(r, d = g(d, a = g(a, n, r, d, t[o + 13], 4, 681279174), n, r, t[o + 0], 11, -358537222), a, n, t[o + 3], 16, -722521979), d, a, t[o + 6], 23, 76029189), r = g(r, d = g(d, a = g(a, n, r, d, t[o + 9], 4, -640364487), n, r, t[o + 12], 11, -421815835), a, n, t[o + 15], 16, 530742520), d, a, t[o + 2], 23, -995338651), r = v(r, d = v(d, a = v(a, n, r, d, t[o + 0], 6, -198630844), n, r, t[o + 7], 10, 1126891415), a, n, t[o + 14], 15, -1416354905), d, a, t[o + 5], 21, -57434055), r = v(r, d = v(d, a = v(a, n, r, d, t[o + 12], 6, 1700485571), n, r, t[o + 3], 10, -1894986606), a, n, t[o + 10], 15, -1051523), d, a, t[o + 1], 21, -2054922799), r = v(r, d = v(d, a = v(a, n, r, d, t[o + 8], 6, 1873313359), n, r, t[o + 15], 10, -30611744), a, n, t[o + 6], 15, -1560198380), d, a, t[o + 13], 21, 1309151649), r = v(r, d = v(d, a = v(a, n, r, d, t[o + 4], 6, -145523070), n, r, t[o + 11], 10, -1120210379), a, n, t[o + 2], 15, 718787259), d, a, t[o + 9], 21, -343485551),
                            a = m(a, i);
                        n = m(n, l), r = m(r, s), d = m(d, c)
                    }
                    return p(a) + p(n) + p(r) + p(d)
                }
            }
        },
        z = !1,
        J = 0,
        Y = !1,
        G = 0,
        X = 0,
        V = -99999,
        m = !1,
        h = !1;
    try {
        j = window.parent.document
    } catch (e) {
        h = !0, console.log(e)
    }
    j || (console.log("not on lagged, use event"), h = !0);
    try {
        "lagged.com" != document.referrer.split("/")[2] && (h = !0)
    } catch (e) {
        h = !0, console.log(e)
    }
    if (!h) try {
        void 0 !== window.parent.useLaggedapiembed && window.parent.useLaggedapiembed && (console.log("embed mode"), h = !0)
    } catch (e) {
        console.log(e)
    }
    vL = [], b = [], LaggedAPI.init = function (e, t) {
        l = e
    }, LaggedAPI.Achievements = {
        save: function (e, t) {
            for (var n, r, a = 0, d = e.length; a < d; a++) - 1 === vL.indexOf(e[a]) && (vL.push(e[a]), b.push(e[a]));
            0 < b.length ? (n = b.length, r = t, setTimeout(function () {
                if (b.length > n) r({
                    success: !0
                });
                else {
                    var e = {
                        action: "save"
                    };
                    e.publickey = l, e.awards = b, b = [];
                    var t = JSON.stringify(e),
                        a = s.base64(t);
                    if (h) {
                        try {
                            window.parent.postMessage("awards|" + a, "*"), r({
                                success: !0
                            })
                        } catch (e) {
                            console.log(e)
                        }
                        return
                    }
                    o("award", "award", "save", a, c, r)
                }
            }, 35)) : t({
                success: !0
            })
        },
        show: function () {
            try {
                window.parent.openAwards()
            } catch (e) {
                try {
                    window.parent.postMessage("openAwards", "*")
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }, LaggedAPI.Scores = {
        save: function (e, t) {
            u = e.board, h || I(!1);
            var a = {
                action: "save"
            };
            a.publickey = l, a.board = e.board, a.score = e.score;
            var n = JSON.stringify(a),
                r = s.base64(n);
            if (h) try {
                window.parent.postMessage("savescore|" + r, "*"), t({
                    success: !0
                })
            } catch (e) {
                console.log(e)
            } else o("highscore", "hs2_p1", "save", r, d, t)
        },
        load: function (e, t) {
            if (h) try {
                window.parent.postMessage("loadscores", "*"), t({
                    success: !0
                })
            } catch (e) {
                console.log(e)
            } else {
                I(!1);
                var a = {
                    action: "load"
                };
                a.publickey = l, a.board = e;
                var n = JSON.stringify(a);
                o("highscore", "hs2_p1", "load", s.base64(n), d, r(t))
            }
        }
    };
    var t, c = function (e, t) {
            var a = {
                success: !0
            };
            e && !0 === e.success ? !0 === e.data.show && v(e.data.achdata, e.user) : (alert("Error: Achievment did not save!"), console.log(e), a.success = !1, a.errormsg = "Error: Achievment did not save!"), t && t(a)
        },
        d = function (e, t) {
            var a = {
                success: !0
            };
            e && !0 === e.success ? (hsData = e, function () {
                J = 0, Y = z = !1;
                var e = document.createElement("div");
                e.id = "leaderboard-wrapper";
                var t = Math.max(document.documentElement.clientHeight, window.parent.innerHeight || 0),
                    a = window.parent.innerWidth;
                710 < t ? e.setAttribute("style", "margin:calc((" + t + "px - 710px)/2) 0 0 calc((100vw - 688px)/2);") : e.setAttribute("style", "height:" + t + "px;margin:0 0 0 calc((100vw - 688px)/2);"), 599 < a && a < 769 && 719 < t ? e.setAttribute("style", "margin:calc(" + t + "px/2 - 355px) 0 0;") : a < 601 && e.setAttribute("style", "margin:0;height:100%"), a < 1205 && t < 501 && e.setAttribute("style", "margin:0;height:100%");
                var n = document.createElement("div");
                n.id = "leaderboard-wrapper-header";
                var r = document.createElement("button");
                r.onclick = function () {
                    j.getElementById("leaderboard-wrapper") && j.getElementById("leaderboard-wrapper").remove(), j.getElementById("leaderboard-modal") && (j.getElementById("leaderboard-modal").onclick = "", j.getElementById("leaderboard-modal").remove())
                }, r.id = "leaderboard-header-button";
                var d = document.createElement("a");
                d.setAttribute("href", "https://lagged.com"), d.setAttribute("target", "_blank"), d.id = "headerlogolink";
                var o, l, s, c, m, p, u, h, g, v, b = document.createElement("div");
                b.id = "score-circle", b.className = "leaderboard-circle", n.appendChild(r), n.appendChild(d), e.appendChild(n), hsData.data && !hsData.data.login ? ((l = document.createElement("div")).className = "yourscore_txtdiv", s = document.createTextNode("Your High Score"), l.appendChild(s), (c = document.createElement("div")).className = "finalscore_divtxt", m = document.createTextNode(P(hsData.data.utop.score)), c.appendChild(m), b.appendChild(l), b.appendChild(c), e.appendChild(b), (o = document.createElement("div")).className = "signup_txti", (p = document.createElement("button")).onclick = function () {
                    var e, t;
                    0 < hsData.data.gamedata.id && (I(!0), (e = new XMLHttpRequest).onreadystatechange = function () {
                        var e;
                        4 == this.readyState && 200 == this.status ? (e = (e = this.responseText).replace(")]}',", ""), e = JSON.parse(e), hsData.data.scoredata = e.data.scoredata, T(), function e(t, a) {
                            var n, r, d, o;
                            "leader" === t && a ? (j.getElementById("score-circle").remove(), j.getElementsByClassName("signup_txti")[1].remove(), j.getElementsByClassName("signup_txti")[0].remove(), j.getElementsByClassName("moregames_wrapper")[0].remove(), j.getElementsByClassName("main_hs_btn")[0].remove(), j.getElementById("headerlogolink").remove()) : j.getElementById("leaderboardRankingWrap").remove(), a && ((n = document.createElement("div")).className = "gameThumbTitleWrap", (r = document.createElement("a")).setAttribute("href", "https://lagged.com/en/g/" + hsData.data.gamedata.url_key), r.setAttribute("title", hsData.data.gamedata.name), r.setAttribute("target", "_blank"), n.appendChild(r), (d = document.createElement("img")).setAttribute("src", "https://imgs2.dab3games.com/" + hsData.data.gamedata.thumb), d.setAttribute("alt", hsData.data.gamedata.name), d.setAttribute("width", "200"), d.setAttribute("height", "200"), r.appendChild(d), o = document.createElement("div"), r.appendChild(o), m = document.createTextNode(hsData.data.gamedata.name), o.appendChild(m), j.getElementById("leaderboard-wrapper-header").appendChild(n));
                            var l = document.createElement("div");
                            l.id = "leaderboardRankingWrap";
                            var s = document.createElement("div");
                            s.id = "tabsButtonWraps";
                            var c = document.createElement("button");
                            c.style.width = "50%", c.onclick = function () {
                                e("leader", !1)
                            }, c.className = "leader" === t ? "tabs_links active" : "tabs_links";
                            var m = document.createTextNode(hsData.data.gamedata.bname);
                            c.appendChild(m);
                            var p = document.createElement("button");
                            p.style.width = "50%", p.onclick = function () {
                                e("share", !1)
                            }, p.className = "share" === t ? "tabs_links active" : "tabs_links";
                            var u = document.createTextNode("Share");
                            if (p.appendChild(u), s.appendChild(c), s.appendChild(p), l.appendChild(s), "leader" === t || "friend" === t) {
                                X = G = 0, V = -99999;
                                var h = document.createElement("div");
                                "friend" === t ? h.className = "leaderboardRankinsRrap friendWrap" : (h.id = "leaderboardScrollDiv", h.className = "leaderboardRankinsRrap");
                                var g = Math.max(document.documentElement.clientHeight, window.parent.innerHeight || 0),
                                    v = window.parent.innerWidth;
                                g < 711 && h.setAttribute("style", "height:calc(" + g + "px - 214px);"), v < 601 && h.setAttribute("style", "height:calc(" + g + "px - 214px);");
                                var b = document.createElement("div");
                                b.className = "leaderboardTopTreWrap";
                                var f, w, E, C, y, N, A, x = hsData.data.scoredata;
                                for ("friend" === t && (x = hsData.data.frndboard), i = 0; i < x.length; i++) {
                                    X++, x[i].scores != V && (G = X, V = x[i].scores), f = "default-avatar.jpg", x[i].avatar && (f = x[i].avatar);
                                    var k, B, T, I, _ = document.createElement("div"),
                                        S = (i < 3 ? (0 === i ? _.className = "leaderboardTopTre leaderboardUserTop3First" : 1 === i ? _.className = "leaderboardTopTre leaderboardUserTop3Second" : _.className = "leaderboardTopTre leaderboardUserTop3Third", (k = document.createElement("div")).className = "topThreeWrap", (q = document.createElement("div")).className = "leaderboardRowRank", H = document.createTextNode(O(G)), q.appendChild(H), k.appendChild(q), (N = document.createElement("a")).setAttribute("href", "https://lagged.com/profile/" + x[i].uid), N.setAttribute("target", "_blank"), (w = document.createElement("img")).setAttribute("src", "https://lagged.com/images/avatars/" + f), w.setAttribute("width", "100"), w.setAttribute("height", "100"), N.appendChild(w), k.appendChild(N), _.appendChild(k), (T = document.createElement("div")).className = "leaderRowUsernameTop", (B = document.createElement("a")).setAttribute("href", "https://lagged.com/profile/" + x[i].uid), B.setAttribute("target", "_blank"), I = document.createTextNode(U(x[i].username)), B.appendChild(I), T.appendChild(B), _.appendChild(T)) : (_.className = "leaderboardUserRowWrap", (q = document.createElement("div")).className = "leaderboardRowRank", H = document.createTextNode(O(G)), q.appendChild(H), _.appendChild(q), (N = document.createElement("a")).setAttribute("href", "https://lagged.com/profile/" + x[i].uid), N.setAttribute("target", "_blank"), (w = document.createElement("img")).setAttribute("src", "https://lagged.com/images/avatars/" + f), w.setAttribute("width", "100"), w.setAttribute("height", "100"), N.appendChild(w), T = document.createElement("div"), I = document.createTextNode(U(x[i].username)), T.appendChild(I), N.appendChild(T), _.appendChild(N)), (E = document.createElement("div")).className = "leaderboardRowScore", document.createTextNode(P(x[i].scores)));
                                    E.appendChild(S), _.appendChild(E), i < 3 ? (b.appendChild(_), h.appendChild(b)) : h.appendChild(_)
                                }
                                "leader" === t && (h.onscroll = function () {
                                    ! function (e, u, h, g) {
                                        var t = j.getElementById("leaderboardScrollDiv");
                                        if (t.scrollTop + t.offsetHeight >= t.scrollHeight && !Y && !z) {
                                            if (Y) return;
                                            var v = document.createElement("div");
                                            v.id = "newScoresLoading", j.getElementById("leaderboardScrollDiv").appendChild(v), J++, Y = !0;
                                            var a = new XMLHttpRequest;
                                            a.onreadystatechange = function () {
                                                if (4 == this.readyState && 200 == this.status) {
                                                    var e = (e = this.responseText).replace(")]}',", "");
                                                    if (e = JSON.parse(e), G = u, X = h, V = g, e.success) {
                                                        e.isfinished && (z = !0);
                                                        var t = e.scoredata;
                                                        for (hsData.data.scoredata = hsData.data.scoredata.concat(t), i = 0; i < t.length; i++) {
                                                            X++, t[i].scores != V && (G = X, V = t[i].scores);
                                                            var a = "default-avatar.jpg";
                                                            t[i].avatar && (a = t[i].avatar);
                                                            var n = document.createElement("div");
                                                            n.className = "leaderboardUserRowWrap";
                                                            var r = document.createElement("div");
                                                            r.className = "leaderboardRowRank";
                                                            var d = document.createTextNode(O(G));
                                                            r.appendChild(d), n.appendChild(r);
                                                            var o = document.createElement("a");
                                                            o.setAttribute("href", "https://lagged.com/profile/" + t[i].uid), o.setAttribute("target", "_blank");
                                                            var l = document.createElement("img");
                                                            l.setAttribute("src", "https://lagged.com/images/avatars/" + a), l.setAttribute("width", "100"), l.setAttribute("height", "100"), o.appendChild(l);
                                                            var s = document.createElement("div"),
                                                                c = document.createTextNode(U(t[i].username));
                                                            s.appendChild(c), o.appendChild(s), n.appendChild(o);
                                                            var m = document.createElement("div");
                                                            m.className = "leaderboardRowScore";
                                                            var p = document.createTextNode(P(t[i].scores));
                                                            m.appendChild(p), n.appendChild(m), j.getElementById("leaderboardScrollDiv").appendChild(n)
                                                        }
                                                    } else z = !0, console.log(e.errors);
                                                    Y = !1, v.remove()
                                                }
                                            };
                                            var n = {
                                                ftype: "loadmorehs"
                                            };
                                            n.countr = J, n.boardid = parseInt(e, 10) || 0, a.open("POST", "//lagged.com/api/v3/ajax.php", !0), a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.send("ftype=" + n.ftype + "&countr=" + J + "&boardid=" + n.boardid), 5 === J && (z = !0)
                                        }
                                    }(hsData.data.gamedata.id, G, X, V)
                                }), l.appendChild(h), "leader" === t ? (f = "default-avatar.jpg", hsData.data.gamedata.avatar && (f = hsData.data.gamedata.avatar), (C = document.createElement("div")).className = "leaderboardUserRowWrap leaderboardBestScoreBottom", (N = document.createElement("a")).setAttribute("href", "https://lagged.com/profile/" + hsData.data.gamedata.uid), N.setAttribute("target", "_blank"), (w = document.createElement("img")).setAttribute("src", "https://lagged.com/images/avatars/" + f), w.setAttribute("width", "100"), w.setAttribute("height", "100"), N.appendChild(w), T = document.createElement("div"), I = document.createTextNode(U(hsData.data.gamedata.username)), T.appendChild(I), N.appendChild(T), C.appendChild(N), (E = document.createElement("div")).className = "leaderboardRowScore", S = document.createTextNode(P(hsData.data.utop.score)), E.appendChild(S), C.appendChild(E), l.appendChild(C)) : "friend" === t && ((C = document.createElement("div")).className = "leaderboardUserRowWrap leaderboardBestScoreBottom friendsinvitebottom", (y = document.createElement("div")).className = "invitethefriends", A = document.createTextNode("Games are more fun with friends!"), y.appendChild(A), C.appendChild(y), (N = document.createElement("a")).setAttribute("href", "https://lagged.com/invite"), N.setAttribute("target", "_blank"), N.className = "main_hs_btn inviteFriendsLink", A = document.createTextNode("Invite your friends"), N.appendChild(A), C.appendChild(N), l.appendChild(C))
                            } else {
                                var M = document.createElement("div");
                                M.className = "signup_txti headeronform";
                                var D = document.createTextNode("You scored " + P(hsData.data.utop.score) + "!");
                                M.appendChild(D), l.appendChild(M);
                                var R = document.createElement("a"),
                                    L = document.createTextNode("Share It!");
                                R.className = "shareitlink facebook", R.setAttribute("href", "https://www.facebook.com/dialog/share?app_id=614526822036983&display=popup&href=https%3A%2F%2Flagged.com%2Fen%2Fg%2F" + encodeURIComponent(hsData.data.gamedata.url_key) + "&quote=I%20scored%20" + P(hsData.data.utop.score) + "%20in%20" + encodeURIComponent(hsData.data.gamedata.name) + "!&redirect_uri=https%3A%2F%2Flagged.com%2Fen%2Fg%2F" + encodeURIComponent(hsData.data.gamedata.url_key)), R.setAttribute("target", "_blank"), R.appendChild(L);
                                var F = document.createElement("a"),
                                    W = document.createTextNode("Tweet It!");
                                F.className = "shareitlink twitter", F.setAttribute("href", "https://twitter.com/intent/tweet?text=I%20scored%20" + P(hsData.data.utop.score) + "%20in%20" + encodeURIComponent(hsData.data.gamedata.name) + "%20https%3A%2F%2Flagged.com%2Fen%2Fg%2F" + encodeURIComponent(hsData.data.gamedata.url_key) + "&source=webclient"), F.setAttribute("target", "_blank"), F.appendChild(W), l.appendChild(R), l.appendChild(F)
                            }
                            j.getElementById("leaderboard-wrapper").appendChild(l)
                        }("leader", !0)) : 4 == this.readyState && (T(), alert("Error loading leaderboard"))
                    }, (t = {}).board = hsData.data.gamedata.id, t.sorder = hsData.data.gamedata.score_order, e.open("POST", "//lagged.com/api/v3/ajax_hs2_p2.php", !0), e.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), e.send("data=" + JSON.stringify(t)))
                }, p.className = "main_hs_btn viewranks", u = document.createTextNode("View Leaderboard"), p.appendChild(u), e.appendChild(o), e.appendChild(p)) : ((b = document.createElement("div")).id = "guestscorecircle", (l = document.createElement("div")).className = "yourscore_txtdiv", s = document.createTextNode("Your High Score"), l.appendChild(s), (c = document.createElement("div")).className = "finalscore_divtxt", m = document.createTextNode(P(hsData.data.topscore)), c.appendChild(m), b.appendChild(l), b.appendChild(c), e.appendChild(b), (p = document.createElement("button")).onclick = function () {
                    ! function b(e) {
                        2 === e ? j.getElementById("achlistwrap").remove() : 1 === e ? (j.getElementById("guestscorecircle").remove(), j.getElementsByClassName("signup_txti")[0].remove(), j.getElementsByClassName("viewleaderguest")[0].remove(), j.getElementsByClassName("moregames_wrapper")[0].remove(), j.getElementsByClassName("main_hs_btn")[0].remove()) : j.getElementById("signupFormWrap").remove();
                        var t = document.createElement("div");
                        t.id = "signupFormWrap";
                        var f = 2 === e ? !1 : !0;
                        isMobile = window.mobilecheck();
                        var a = document.createElement("div");
                        a.id = "tabsButtonWraps", a.className = "logintabs", (n = document.createElement("button")).className = "tabs_links active", n.style.width = "50%";
                        var n, r = document.createTextNode("Sign Up for Free");
                        n.appendChild(r), a.appendChild(n), (n = document.createElement("button")).className = "tabs_links", n.style.width = "50%", n.onclick = function () {
                            ! function () {
                                j.getElementById("signupFormWrap").remove();
                                var e = document.createElement("div");
                                e.id = "signupFormWrap";
                                var t = document.createElement("div");
                                t.id = "tabsButtonWraps", t.className = "logintabs", (a = document.createElement("button")).onclick = function () {
                                    b(3)
                                }, a.className = "tabs_links", a.style.width = "50%";
                                var a, n = document.createTextNode("Sign Up for Free");
                                a.appendChild(n), t.appendChild(a), (a = document.createElement("button")).className = "tabs_links active", a.style.width = "50%", n = document.createTextNode("Log in"), a.appendChild(n), t.appendChild(a), e.appendChild(t);
                                var r = document.createElement("form");
                                r.id = "loginit", r.onsubmit = function () {
                                    return B("login")
                                };
                                var d = document.createElement("div");
                                d.className = "form-group";
                                var o = document.createElement("label");
                                o.setAttribute("form", "inputEmail2");
                                var i = document.createTextNode("Your email address");
                                o.appendChild(i), d.appendChild(o);
                                var l = document.createElement("input");
                                l.setAttribute("type", "email"), l.setAttribute("name", "name"), l.id = "inputEmail2", l.className = "form-control", l.required = !0, isMobile || (l.autofocus = !0), d.appendChild(l), r.appendChild(d);
                                var s = document.createElement("div");
                                s.className = "form-group";
                                var c = document.createElement("label");
                                c.setAttribute("form", "inputEmail3");
                                var m = document.createTextNode("Your password");
                                c.appendChild(m), s.appendChild(c);
                                var p = document.createElement("input");
                                p.setAttribute("type", "password"), p.setAttribute("name", "name"), p.id = "inputEmail3", p.className = "form-control", p.required = !0, s.appendChild(p), r.appendChild(s);
                                var u = document.createElement("button");
                                u.onclick = function () {
                                    return B("login", f)
                                }, u.className = "main_hs_btn viewranks", u.id = "createloginBtnMain";
                                var h = document.createTextNode("Submit");
                                u.appendChild(h), r.appendChild(u), e.appendChild(r);
                                var g = document.createElement("a"),
                                    v = document.createTextNode("Forgot password?");
                                g.style.marginTop = "15px", g.setAttribute("href", "https://lagged.com/help/password/"), g.setAttribute("target", "_blank"), g.appendChild(v), e.appendChild(g), j.getElementById("leaderboard-wrapper").appendChild(e), isMobile || j.getElementById("inputEmail2").focus()
                            }()
                        }, r = document.createTextNode("Log in"), n.appendChild(r), a.appendChild(n), t.appendChild(a);
                        var d = document.createElement("form");
                        d.id = "loginit", d.onsubmit = function () {
                            return B("signup")
                        };
                        var o = document.createElement("div");
                        o.className = "form-group";
                        var i = document.createElement("label");
                        i.setAttribute("form", "inputEmail1");
                        var l = document.createTextNode("Choose a nickname");
                        i.appendChild(l), o.appendChild(i);
                        var s = document.createElement("input");
                        s.setAttribute("type", "text"), s.setAttribute("name", "name"), s.id = "inputEmail1", s.className = "form-control", s.required = !0, isMobile || (s.autofocus = !0), o.appendChild(s), d.appendChild(o);
                        var c = document.createElement("div");
                        c.className = "form-group";
                        var m = document.createElement("label");
                        m.setAttribute("form", "inputEmail2");
                        var p = document.createTextNode("Your email address");
                        m.appendChild(p), c.appendChild(m);
                        var u = document.createElement("input");
                        u.setAttribute("type", "email"), u.setAttribute("name", "name"), u.id = "inputEmail2", u.className = "form-control", u.required = !0, c.appendChild(u), d.appendChild(c);
                        var h = document.createElement("div");
                        h.className = "form-group";
                        var g = document.createElement("label");
                        g.setAttribute("form", "inputEmail3");
                        var v = document.createTextNode("Create a password");
                        g.appendChild(v), h.appendChild(g);
                        var w = document.createElement("input");
                        w.setAttribute("type", "password"), w.setAttribute("name", "name"), w.setAttribute("placeholder", "At least 6 characters"), w.id = "inputEmail3", w.className = "form-control", w.required = !0, h.appendChild(w), d.appendChild(h);
                        var E = document.createElement("button");
                        E.onclick = function () {
                            return B("signup", f)
                        }, E.className = "main_hs_btn viewranks", E.id = "createloginBtnMain";
                        var C = document.createTextNode("Submit");
                        E.appendChild(C), d.appendChild(E), t.appendChild(d), j.getElementById("leaderboard-wrapper").appendChild(t), isMobile || j.getElementById("inputEmail1").focus()
                    }(1)
                }, p.className = "main_hs_btn guestsubmitmainhs", u = document.createTextNode("Submit High Score"), p.appendChild(u), e.appendChild(p), (h = document.createElement("a")).onclick = function () {
                    try {
                        window.parent.openLeaderboards()
                    } catch (e) {
                        console.log(e)
                    }
                }, h.className = "viewleaderguest", (g = document.createElement("img")).setAttribute("src", "https://imgs2.dab3games.com/highscore-games-icon.jpg"), g.setAttribute("alt", "icon"), g.setAttribute("width", "40"), g.setAttribute("height", "40"), h.appendChild(g), v = document.createTextNode("View Leaderboard"), h.appendChild(v), e.appendChild(h));
                var f = document.createElement("div");
                hsData.data.login ? f.className = "popmoregameswrap" : f.className = "popmoregameswrap userrbpop";
                var w = document.createElement("div");
                w.className = "signup_txti moregametxt guessmoregmtxt", hsData.data.login || (w.className = "signup_txti moregametxt");
                var E = document.createTextNode("More Games");
                w.appendChild(E), f.appendChild(w);
                var C = window.parent.jsMoreGames,
                    y = document.createElement("div");
                y.className = "moregames_wrapper guestmoregames";
                var N = 12;
                for (hsData.data.login || (N = 5, y.className = "moregames_wrapper"), i = 0; i < N; i++) {
                    var A = document.createElement("div");
                    A.className = "thumbWrapper";
                    var x = document.createElement("div"),
                        q = document.createElement("a");
                    1 == C[i].io ? q.setAttribute("href", "https://lagged.com/io/" + C[i].url_key) : q.setAttribute("href", "https://lagged.com/en/g/" + C[i].url_key), q.setAttribute("title", C[i].name), q.setAttribute("target", "_blank");
                    var H = document.createTextNode(C[i].name);
                    q.appendChild(H);
                    var k = document.createElement("img");
                    k.setAttribute("src", "https://imgs2.dab3games.com/" + C[i].thumb), k.setAttribute("alt", C[i].name), k.setAttribute("width", "200"), k.setAttribute("height", "200"), x.appendChild(q), x.appendChild(k), A.appendChild(x), y.appendChild(A)
                }
                f.appendChild(y), e.appendChild(f), j.body.appendChild(e), T()
            }()) : (T(), j.getElementById("leaderboard-modal").remove(), alert("Error: Could not save high score!"), console.log(e), a.success = !1, a.errormsg = "Error: Could not save high score!"), t && t(a)
        },
        r = function (e) {},
        g = 0,
        v = function (e, t) {
            m = window.parent.isFullscreen, j = m ? document : window.parent.document, 4 < ++g && (g = 1);
            var a = "achievement_pops_" + g,
                n = j.createElement("div");
            n.id = "achievementPopWrap", n.className = a, n.onclick = function () {
                j.getElementsByClassName(a)[0].remove()
            };
            var r = "Achievment Saved";
            1 < e.acount && (r = e.acount + " Achievments Saved");
            var d = document.createElement("div");
            d.className = "achievement_title";
            var o = document.createTextNode(r);
            d.appendChild(o), n.appendChild(d);
            var i = document.createElement("div");
            i.className = "achievement_desc";
            var l = document.createTextNode(e.name);
            i.appendChild(l), n.appendChild(i);
            var s = document.createElement("div");
            s.className = "achievement_xp";
            var c = document.createTextNode("+" + e.points + "xp");
            if (s.appendChild(c), n.appendChild(s), j.body.appendChild(n), t) try {
                window.parent.newLevel(t)
            } catch (e) {
                console.log(e)
            }
            setTimeout(function () {
                j.getElementsByClassName(a)[0] && (p(j.getElementsByClassName(a)[0]), g--, setTimeout(function () {
                    j.getElementsByClassName(a)[0] && j.getElementsByClassName(a)[0].remove()
                }, 200))
            }, 4e3)
        };
    LaggedAPI.APIAds = {
        show: function (e, t, a, n) {
            if (console.log("show api ads"), h) {
                try {
                    window.parent.postMessage("apiAds", "*")
                } catch (e) {
                    console.log(e)
                }
                setTimeout(function () {
                    n({
                        success: !0
                    })
                }, 7e3)
            } else {
                try {
                    if (window.parent.isPlusUser) return console.log("is plus user, return to game"), void n({
                        success: !0
                    })
                } catch (e) {
                    console.log(e)
                }
                try {
                    if (window.parent.document.getElementById("adsContainer")) return console.log("ad exists"), void n({
                        success: !0
                    })
                } catch (e) {
                    console.log(e)
                }
                var r = document.createElement("div");
                r.id = "adsContainer", window.parent.fullScMode ? r.className = "fullscreenmode" : r.className = "strectherr";
                var d = document.createElement("video");
                d.id = "videoElement", d.playsinline = !0, r.appendChild(d);
                var o = document.createElement("div");
                o.id = "adContainer2", r.appendChild(o), window.parent.document.body.insertBefore(r, window.parent.document.body.childNodes[0]);
                var i = document.createElement("div");
                i.id = "logo-preloader", i.className = "ingameads", window.parent.fullScMode && (i.className = "ingameads fullscreenmode");
                var l = document.createElement("div");
                l.id = "adpreloaderwrap";
                var s = document.createElement("div");
                s.className = "adtagwrap preloadnew", l.appendChild(s);
                var c = document.createElement("button");
                c.id = "playnow", c.className = "buttonloading interads1", c.onclick = function () {
                    var t = !1;
                    window.parent.interShow(function (e) {
                        if (!t) {
                            t = !0;
                            try {
                                window.parent.gtag("event", "conversion", {
                                    send_to: "AW-1055364430/bEUtCMmy4LcBEM6qnvcD"
                                })
                            } catch (e) {
                                console.log(e)
                            }
                            n({
                                success: !0
                            })
                        }
                    }), clearTimeout(p)
                };
                var m = document.createTextNode("Continue");
                c.appendChild(m);
                try {
                    window.parent.adThumb && (c.style.background = "#2a6797 0 0 / 50px 50px url(https://imgs2.dab3games.com/" + window.parent.adThumb + ") no-repeat")
                } catch (e) {
                    console.log(e)
                }
                l.appendChild(c), i.appendChild(l), window.parent.document.body.insertBefore(i, window.parent.document.body.childNodes[0]);
                try {
                    setTimeout(function () {
                        c.className = "interads1"
                    }, 300)
                } catch (e) {
                    console.log(e)
                }
                var p = setTimeout(function () {
                    window.parent.showGameAfterAd(!0), n({
                        success: !0
                    })
                }, 45e3)
            }
        }
    };
    window.addEventListener("resize", function () {
        var e, t;
        adsManager && adsplaying && (e = window.innerWidth, t = window.innerHeight, document.getElementById("adContainer").style.width = e + "px", document.getElementById("adContainer").style.height = t + "px", adsManager.resize(e, t, google.ima.ViewMode.NORMAL))
    }, !1), window.mobilecheck = function () {
        var e = !1,
            t = navigator.userAgent || navigator.vendor || window.opera;
        return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0), e
    }, Element.prototype.remove = function () {
        this.parentElement.removeChild(this)
    }, NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
        for (var e = this.length - 1; 0 <= e; e--) this[e] && this[e].parentElement && this[e].parentElement.removeChild(this[e])
    }
}();
