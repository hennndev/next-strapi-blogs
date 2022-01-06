import { NextResponse } from "next/server";

export default function middleware(req, res) {

    const { token, userLogin } = req.cookies

    const path = req.page.name

    if(path === '/signin') {
        if(token) {
            return NextResponse.redirect('/')
        }
    }
    if(path === '/add-blog') {
        if(!token) {
            return NextResponse.redirect('/signin')
        }
    }
    if(path === '/dashboard') {
        if(userLogin) {
            if(JSON.parse(userLogin).username !== 'admin') {
                return NextResponse.redirect('/')
            }
        } else {
            return NextResponse.redirect('/')
        }
    }
}