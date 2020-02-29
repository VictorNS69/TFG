#!/usr/bin/env python3

from werkzeug.wrappers import Request, Response
from werkzeug.serving import run_simple
from jsonrpc import JSONRPCResponseManager, dispatcher
from datetime import date

manager = JSONRPCResponseManager()


# 1st way to add a method
@dispatcher.add_method
def echo(arg):
	return arg


# 2nd way to add a method
dispatcher["today"] = lambda: "Today is " + str(date.today().strftime("%d/%m/%Y"))


def add(a, b):
	return a + b


# 3rd way to add a method
dispatcher.add_method(add, name="addition")


@Request.application
def application(request):
	response = manager.handle(request.get_data(as_text=True), dispatcher)
	return Response(response.json, mimetype='application/json')


if __name__ == '__main__':
	print("--- SERVER ---")
	run_simple('localhost', 4000, application)
