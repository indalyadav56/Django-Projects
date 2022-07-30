def convert_to_bool(value):
    if value == 'true':
        return True
    if value == 'false':
        return False
    return value


def is_admin(user):
    is_admin_user = False
    is_superuser = False
    if user and hasattr(user, 'is_admin'):
        is_admin_user = user.is_admin

    if user and hasattr(user, 'is_superuser'):
        is_superuser = user.is_superuser

    return is_superuser or is_admin_user


def get_user_name(username, last_name, first_name):
    if first_name and last_name:
        return '{} {}'.format(first_name, last_name)
    if first_name:
        return first_name
    if last_name:
        return last_name
    return username
