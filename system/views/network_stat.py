from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from speedtest import Speedtest, ConfigRetrievalError
from datetime import datetime

def classify_network(ping, download, upload):
    if ping < 50 and download > 20 and upload > 10:
        return "Good"
    elif ping <= 100 and download >= 5 and upload >= 2:
        return "Moderate"
    else:
        return "Poor"

@csrf_exempt
def get_realtime_network_stats(request):
    try:
        st = Speedtest(timeout=3)  # Prevent long-running calls
        st.get_best_server()

        download_speed = round(st.download() / 1_000_000, 2)  # Mbps
        upload_speed = round(st.upload() / 1_000_000, 2)      # Mbps
        avg_ping = round(st.results.ping, 2)                  # ms

        status = classify_network(avg_ping, download_speed, upload_speed)

        return JsonResponse({
            "download_speed": download_speed,
            "upload_speed": upload_speed,
            "ping": avg_ping,
            "status": status,
            "timestamp": datetime.now().isoformat()
        })

    except ConfigRetrievalError:
        return JsonResponse({
            "error": "Unable to retrieve speedtest configuration or server list."
        }, status=503)

    except Exception as e:
        print("Error in get_realtime_network_stats:", e)
        return JsonResponse({"error": str(e)}, status=500)
