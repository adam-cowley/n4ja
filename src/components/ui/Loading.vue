<template>
    <div class="n4ja-loading loading">
        <span v-html="message" />
    </div>
</template>

<script>
export default {
    name: 'N4jaLoading',
    props: {
        message: {
            type: [ String, Number, Object ],
            default: () => 'Loading.  Please Wait&hellip;'
        },
    },
}
</script>

<style>
.loading {
    /* height: 200px; */
    /* width: 100%; */
    background-color: #ccc;
    border-radius: .2rem;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 5000;
}

  .loading:before, .loading:after {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: block;
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    top: 50%;
    margin-top:-40px;
    margin-left:-40px;

    background: #fff;

    animation: pop 1.2s infinite;
  }

  .loading:after {
    animation-delay: .5s;
  }

  .loading span {
    height: 30px;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin-top: 60px;
    margin-left: 0;
    text-align: center;

    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
  }


@keyframes pop { 
    0% {
        /* @include pop(0, 0); */
        height: 0;
        width: 0;
        opacity: 0;
        margin-left: 0;
        margin-top: 0;
    }
    50% {
        /* @include pop(80, .4); */
        height: 40px;
        width: 40px;
        opacity: .4;
        margin-left: -20px;
        margin-top: -20px;
    }
    100% {
        /* @include pop(60, 0); */
        height: 60px;
        width: 60px;
        opacity: 0;
        margin-left: -30px;
        margin-top: -30px;
    }
}
</style>


