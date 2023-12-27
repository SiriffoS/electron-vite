from __future__ import absolute_import
import sys

from .Studiocamp import Studiocamp


def create_instance(c_instance):
    return Studiocamp(c_instance)
