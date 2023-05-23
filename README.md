# ADT_SoSe23
 ADT & Projektmanagement Projekt

installation of nodemon:
1. npm init
    - enter until "entry point" -> app.js
    - enter until end
2. npm install
3. node app
4. npm install nodemon -g
5. nodmemon -> finished



.color1 {color: #2c544a;}
.color2 {color: #3c5c51;}
.color3 {color: #557767;}
.color4 {color: #7aa887;}
.color5 {color: #bbe6b7;}

async function openpopupleft() {
    const contactofPerson = document.getElementById('contactofPerson');
    const id = contactofPerson.value;
    popupleft.style.display = "block";

          const response = await fetch(`/customer/data?id=${id}`);
          
          console.log(response);
        }


POPUP
<!-- 
        <div class="allpopup">
            <div class="popup">
                <div class="contentboxpopup">
                    <div class="closepopup"></div>
                    <div class="imgpop">
                        <img src="https://www.bellfor.info/image/catalog/Blog/blog-preview/grosse-hunde.png">
                    </div>
                    <div class="contentpopup">
                        <div>
                            <h3>Spezielles Angebot</h3>
                            <h2>80<sup>%</sup><span>Off</span></h2>
                            <p>nur diese Woche!</p>
                            <a href="/Hunderasse">zum Deal</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        POPUP-->

<!--POPUP-->
<script>
  //const popup = document.querySelector(".popup");
  //const closepopup = document.querySelector(".closepopup");
  // window.onload = function () {
  //   setTimeout(
  //     function () {
  //       popup.style.display = "block";
  //     } /*here you can add time for example 2000*/
  //   );
  // };

  // closepopup.addEventListener("click", () => {
  //   popup.style.display = "none";
  // });
</script>

.allpopup
{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    position: absolute;
}
.popup
{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: none;
}
.contentboxpopup
{
    position: relative;
    width: 600px;
    height: 400px;
    background: #fff;
    border-radius: 20px;
    display: flex;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
.contentboxpopup .imgpop
{
    position: relative;
    width: 300px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.contentboxpopup .imgpop::before
{
    content: '';
    position: absolute;
    width: 250px;
    height: 250px;
    background: #14522699;
    border-radius: 50%;
}
.contentboxpopup .imgpop img
{
    position: relative;
    max-width: 250px;
    z-index: 1;
}
.contentboxpopup .contentpopup
{
    position: relative;
    width: 300px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.contentboxpopup .contentpopup h3
{
    color: #333;
    line-height: 1em;
    font-weight: 300;
    font-size: 2em;
}
.contentboxpopup .contentpopup h2
{
    font-size: 4em;
    color: #ff4d54;
    line-height: 1em;
}
.contentboxpopup .contentpopup h2 span
{
    color: #333;
    font-size: 0.75em;
    text-transform: uppercase;
}
.contentboxpopup .contentpopup p
{
    font-weight: 300;
}
.contentboxpopup .contentpopup a
{
    display: inline-block;
    padding: 10px 20px;
    background: #ff4d54;
    color: #fff;
    margin-top: 15px;
    text-decoration: none;

}
.closepopup
{
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: #f3f3f3 url(https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/close-icon.png);
    background-repeat: no-repeat;
    background-size: 10px;
    background-position: center;
    cursor: pointer;
    border-radius: 50%;
    z-index: 10;
}


.contentdiv{
    display: flex;
    flex-direction: column;
    justify-content: center; 
    height: 100%;
    align-items: center;
    justify-content: space-around;
}
