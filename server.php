<?php
$ws = new swoole_websocket_server('0.0.0.0',8091);

function broadcast(swoole_websocket_server $ws, $msg, $me = null) {
    foreach($ws->connections as $fd) {
        if($fd != $me) {
            $ws->push($fd, $msg);
        }
    }
}

// 监听WebSocket连接打开事件
$ws->on('open', function (swoole_websocket_server $ws, $request) {
    $ws->push($request->fd, "欢迎接入miss聊天平台\n");
    broadcast($ws, "用户{$request->fd}登录啦！", $request->fd);
});

// 监听WebSocket消息事件
$ws->on('message', function (swoole_websocket_server $ws, $frame) {
    $msg =  'from'.$frame->fd.":{$frame->data}\n";
    broadcast($ws, $msg);
   // $ws->push($frame->fd, "server: {$frame->data}");
    // $ws->push($frame->fd, "server: {$frame->data}");
});

// 监听WebSocket连接关闭事件
$ws->on('close', function (swoole_websocket_server $ws, $fd) {
    broadcast($ws, "用户{$fd}下线啦！");
});

$ws->start();
?>
