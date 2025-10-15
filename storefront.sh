#!/bin/bash

# Storefront 管理脚本
# 使用方法: ./storefront.sh [命令]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 显示帮助信息
show_help() {
    echo "Storefront 管理脚本"
    echo ""
    echo "使用方法: ./storefront.sh [命令]"
    echo ""
    echo "可用命令:"
    echo "  start     启动 storefront 服务"
    echo "  stop      停止 storefront 服务"
    echo "  restart   重启 storefront 服务"
    echo "  reset     完全重置（重新构建）"
    echo "  status    查看服务状态"
    echo "  logs      查看服务日志"
    echo "  shell     进入 storefront 容器 shell"
    echo "  build     重新构建镜像"
    echo "  help      显示此帮助信息"
    echo ""
    echo "示例:"
    echo "  ./storefront.sh start"
    echo "  ./storefront.sh logs"
    echo "  ./storefront.sh shell"
}

# 启动服务
start_services() {
    print_info "启动 Storefront 服务..."
    docker compose up -d
    print_success "Storefront 服务启动完成！"
    print_info "访问地址:"
    echo "  - Storefront: https://storefront.saleor.tattoogoat.com/"
    echo "  - 本地端口: http://localhost:3030"
}

# 停止服务
stop_services() {
    print_info "停止 Storefront 服务..."
    docker compose down
    print_success "Storefront 服务已停止！"
}

# 重启服务
restart_services() {
    print_info "重启 Storefront 服务..."
    docker compose down
    docker compose up -d
    print_success "Storefront 服务重启完成！"
}

# 查看服务状态
show_status() {
    print_info "Storefront 服务状态:"
    docker compose ps
    echo ""
    print_info "网络状态:"
    docker network ls | grep saleorgoat
}

# 查看日志
show_logs() {
    print_info "查看 Storefront 服务日志..."
    docker compose logs -f
}

# 完全重置
reset_all() {
    print_warning "⚠️  这将重新构建 Storefront 镜像！"
    read -p "确定要继续吗？(y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "停止并删除容器..."
        docker compose down
        
        print_info "重新构建并启动服务..."
        docker compose up --build -d
        
        print_success "Storefront 重置完成！"
        print_info "访问地址:"
        echo "  - Storefront: https://storefront.saleor.tattoogoat.com/"
        echo "  - 本地端口: http://localhost:3030"
    else
        print_info "操作已取消"
    fi
}

# 重新构建
build_images() {
    print_info "重新构建 Storefront 镜像..."
    docker compose build
    print_success "Storefront 镜像构建完成！"
}

# 进入容器 shell
enter_shell() {
    print_info "进入 Storefront 容器..."
    docker compose exec saleor-storefront /bin/sh
}

# 主函数
main() {
    case "${1:-help}" in
        "start")
            start_services
            ;;
        "stop")
            stop_services
            ;;
        "restart")
            restart_services
            ;;
        "reset")
            reset_all
            ;;
        "status")
            show_status
            ;;
        "logs")
            show_logs
            ;;
        "build")
            build_images
            ;;
        "shell")
            enter_shell
            ;;
        "help"|"-h"|"--help")
            show_help
            ;;
        *)
            print_error "未知命令: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# 执行主函数
main "$@"
