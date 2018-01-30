<template>
  <div class="loading_con">
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <p class="loading_text">载入中...</p>
  </div>

</template>

<script></script>

<style>
  .loading_con{ width: 100%; height: 100%; position: fixed;
    top:0;left: 0;  background:rgba(255,255,255,0.6);  }
  .loading_text{position: fixed;
    top: 60%;
    left: 0;
    font-size: 1.4rem;
    width: 100%;
    text-align: center;
    color: #ccc;
  }
  .loading_con .spinner {
    margin: 100px auto 0;
    width: 150px;
    text-align: center;
    position: relative;
    top: 37%;
  }

  .spinner > div {
    width: 30px;
    height: 30px;
    background-color: #ccc;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    /* Prevent first frame from flickering when animation starts */
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0.0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes bouncedelay {
    0%, 80%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 40% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
  }
</style>
